import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Box,
  Grid,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";

import CardCustom from "../CardCustom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "80vw",
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 10,
  },
  CardCustom: {},
  SearchResultsContainer: {},
  ResultHead: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingBottom: 10,
  },
  formControl: {
    minWidth: 130,
    width: "15%",
  },
}));

SearchResultsSection.defaultProps = {
  searchQuery: {
    jobTitle: "",
    startingSalary: "",
    highestSalary: "",
    contract: "",
    location: "",
    beforeSearch: false,
    searchDone: false,
  },
};
export default function SearchResultsSection({ searchQuery, setsearchQuery }) {
  const classes = useStyles();
  const [SortValue, setSortValue] = useState("");
  const SortList = ["Date", "Alphabetically"];
  const colors = [
    "#f39400",
    "#b14550",
    "#9cb279",
    "#9b5873",
    "#647fb5",
    "#98719d",
    "#6c6671",
    "#89adca",
  ];
  // fetch Data
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const handleSortChange = (e) => {
    setSortValue(e.target.value);

    if (e.target.value === "Date") {
      setItems(
        items.sort((obj1, obj2) => {
          if (obj1.jobStartTime < obj2.jobStartTime) return -1;
          if (obj1.jobStartTime > obj2.jobStartTime) return 1;
          return 0;
        }),
      );
    }
    if (e.target.value === "Alphabetically") {
      items.sort((obj1, obj2) => {
        if (obj1.positionName < obj2.positionName) return -1;
        if (obj1.positionName > obj2.positionName) return 1;
        return 0;
      });
    }
  };

  const filterListing = (value) => {
    const PName = value.positionName.toLowerCase().includes(searchQuery.jobTitle.toLowerCase());
    let LSalary = true;
    if (searchQuery.startingSalary !== "" && searchQuery.startingSalary !== -1) {
      LSalary = value.jobSalary >= searchQuery.startingSalary;
    }
    let HSalary = true;
    if (
      searchQuery.highestSalary !== ""
      && searchQuery.highestSalary !== -1
      && searchQuery.startingSalary !== -1
    ) {
      HSalary = value.jobSalary <= searchQuery.highestSalary;
    }
    let ContractT = true;
    let Hours = true;
    if (searchQuery.contract.length !== 0) {
      ContractT = searchQuery.contract.includes(value.jobHours);
      Hours = searchQuery.contract.includes(value.jobContract);
    }
    let Location = true;

    if (searchQuery.location.includes("Other")) {
      Location = !["Auckland", "Christchurch", "Wellington", "Remote"].includes(value.jobLocation);
    } else if (searchQuery.location.length !== 0) {
      Location = searchQuery.location.includes(value.location);
    }
    console.log(ContractT || Hours);
    return value.isActive && PName && HSalary && LSalary && (ContractT || Hours) && Location;
  };

  useEffect(() => {
    const fetchJobInfo = async () => {
      await fetch("https://cs399-team15.herokuapp.com/api/admin/get-job-info")
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result.filter(filterListing));
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          },
        );
    };
    fetchJobInfo();
    setsearchQuery({ ...searchQuery, searchDone: true });
  }, [searchQuery.searchDone]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <Box className={classes.root} sx={{ width: "100vw" }}>
      <Box className={classes.ResultHead}>
        <Button
          variant="contained"
          onClick={() => setsearchQuery({ ...searchQuery, beforeSearch: true })}
        >
          Back
        </Button>
        <Typography variant="h3" style={{ fontFamily: "Oswald", flexGrow: 1 }}>
          Found {items.length} Jobs Matching Your Search
        </Typography>

        <FormControl className={classes.formControl}>
          <InputLabel>Sort</InputLabel>

          <Select value={SortValue} name="sort" onChange={(e) => handleSortChange(e)}>
            {SortList.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Divider style={{ marginBottom: 10 }} />

      <Grid
        container
        direction="row"
        spacing={1}
        className={classes.SearchResultsContainer}
        spaceing={2}
      >
        {items.map((listing, i) => (
          <Grid
            item
            sm={6}
            md={4}
            xs={12}
            key={`${listing.positionName} search result ${i.toString()}`}
          >
            <CardCustom
              rounded
              item={listing}
              color={colors[i % 8]}
              className={classes.CardCustom}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
