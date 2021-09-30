import { React, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ImageListItem, ImageList, CardActionArea } from '@material-ui/core';
import { PropTypes } from 'prop-types';
import CardCustom from '../CardCustom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

/** this Is probably a one time class */
// Dynamic Job Listing Bottom
export default function DJLB(props) {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const layout = [2, 1, 1, 1, 1, 2, 1, 1];
  const itemsLength = props.items.length - 1;
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

  if (error) {
    return <div>An Errror Occurced: {error}</div>;
  }
  if (props.isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <ImageList cols={5} gap={0}>
      {props.items.slice(0, 8).map((item, index) => (
        <ImageListItem
          rows={props.items.length > 4 ? 1 : 2}
          key={`${item.positionName} Lastest ${index.toString()}`}
          cols={itemsLength === index ? 9 - index : layout[index]}
          classnam={classes.imageListItem}
        >
          <CardCustom
            item={item}
            color={colors[index]}
            detailOpen={props.detailOpen}
            closeDetail={props.closeDetail}
            userData={props.userData}
            handleUpdate={props.handleUpdate}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
