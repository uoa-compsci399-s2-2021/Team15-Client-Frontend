import { React, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ImageListItem, ImageList, CardActionArea } from '@material-ui/core';
import { PropTypes } from 'prop-types';
import CardCustom from './CardCustom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

DJLB.defaultProps = {
  blankCard: {
    positionName: 'No positions available',
    companyName: '',
    jobSalary: '',
    jobLocation: '',
    jobDescription: 'Sorry we Currently dont have many Jobs Right Now, Check back later',
  },
};

DJLB.propTypes = {
  blankCard: PropTypes.object,
};
/** this Is probably a one time class */
// Dynamic Job Listing Bottom
export default function DJLB(props) {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const layout = [2, 1, 1, 1, 1, 2, 1, 1];
  const colors = [
    '#f39400',
    '#b14550',
    '#9cb279',
    '#9b5873',
    '#647fb5',
    '#98719d',
    '#6c6671',
    '#89adca',
  ];

  const addblank = () => {
    const itemDiff = 8 - items.length;
    for (let i = 0; i < itemDiff; i += 1) {
      setItems([...items, props.blankCard]);
    }
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/get-job-info')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        },
      );
  }, []);

  addblank();

  if (error) {
    addblank();
    console.log('There are no Job in the DB');
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <ImageList cols={5} gap={0}>
      {items.slice(0, 8).map((item, index) => (
        <ImageListItem rows={1} key={item + index.toString()} cols={layout[index]}>
          <CardActionArea style={{ height: '100%' }}>
            <CardCustom item={item} color={colors[index]} />
          </CardActionArea>
        </ImageListItem>
      ))}
    </ImageList>
  );
}
