// Next-React Imports
import React from "react";
// Component Imports
import NewReview from "../review/NewReview";
// UI Imports
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormHelperText, Avatar } from "@mui/material";
import Slider from '@mui/material/Slider';
// Icon Imports
import { Star } from '../../icons/star'
// Uitls Imports
import { getInitials } from "../../utils/get-initials";
import moment from 'moment'


const ListReviews = ({ reviews, user, id }) => {


  const reviewList = [
    {reviewItem: "Quality", rating: "5"}, {reviewItem: "Communication", rating: "4"}, 
    {reviewItem: "Value", rating: "2.5"}, {reviewItem: "On Time", rating: "3"},
  ]

  const overallRating = (rating) => {
    const [ qualityRating, valueRating, communicationRating, timeRating ] = rating;
    return ((Number(qualityRating.rating) + Number(valueRating.rating) + Number(communicationRating.rating) + Number(timeRating.rating)) / rating.length).toFixed(1)
  }


  return (
    <>
      <Grid container sx={{ mt: 2}}>
        <Box sx={{ display: "flex", flexDirection: "row", flexGrow: 1}}>

          <Box sx={{ flexGrow: 1,  order: 1}}>
            <Box sx={{display: "flex", flexDirection: "row", ml: 2}}>
              <Box sx={{ ml: 1, mr: 1, display: "flex" }}>
                <Star color={"primary"} />
                <Typography variant="subtitle1">
                  {overallRating(reviewList)}
                </Typography>
              </Box>
              <Box sx={{ mr: 1}}>
                <Typography variant="subtitle1" >
                  -
                </Typography>
              </Box>

              <Box sx={{ mr: 1}}>
                <Typography variant="subtitle1">
                 {reviews && reviews ? `${reviews.length} reviews` : "0"}
                </Typography>
              </Box>

              </Box>
          </Box>
        
          <Box sx={{ order: 2, mt: -3, mr: 10 }}>
            {user ? <NewReview reviewID={id} /> : <></>}
          </Box>
        </Box>
      </Grid>




      <Grid container  sx={{ mt: 2, mb: 2 }} >
        {reviewList &&
          reviewList.map((item) => (
            <>
              <Grid
                item
                key={item.reviewItem}
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                sx={{
                  mt: .5, mb: .5
                }}
              >
                <div style={{ width: '100%'}}>
                  <Box sx={{display: 'flex', ml: 3}}>
                    <Box sx={{ width: '50%'}}>

                      
                        <Typography varient={"subtitle1"} >
                          {item.reviewItem}
                        </Typography>

                    </Box> 

                    <Box sx={{ width: '50%', display: 'flex' }}>
                      <Box sx={{ width: '50%', display: 'flex' }}>
                          <Slider 
                            value={item.rating} 
                            size="small" 
                            marks 
                            min={0} 
                            max={5} 
                            sx={{
                              '& .MuiSlider-thumb': {
                                borderRadius: '50%',
                                width: '6px',
                                height: '6px',
                                m:0
                              }
                            }}
                           />
                      </Box>                 
                    
                      <Box sx={{ ml: 2, display: 'flex' }}>
                        <Typography varient={"subtitle1"} >
                          {item.rating}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </div>

              </Grid>
            </>
          ))}
        </Grid>





      <Grid container sx={{ }}>
        {reviews &&
          reviews.map((review) => (
            <>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                xl={6}
                sx={{
                  alignItems: "center",
                  mb: 1,
                  
                  
                }}
              >
              <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    ml: 2,

                  }}
                >


                  <Box 
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      mb: 1
                      }}>
                      
                      <Avatar
                        src={""}
                        sx={{
                          height: 50,
                          width: 50,  
                          mr: 1
                        }}
                      >
                        {`${getInitials(review.firstName)}${getInitials(
                          review.lastName
                        )}`}
                      </Avatar>

                   <Box
                    sx={{
                      display: "flex",    
                      flexDirection: "column",
                      }}>
                   <Box sx={{ display: "flex", mb: -0.7, mt: 1 }}>
                    <Typography variant={"subtitle1"}>
                      {review.firstName}
                    </Typography>
                   </Box>


                    <Box sx={{ display: "flex", }}>
                        <Typography variant={"caption"} sx={{ color: 'text.secondary' }}>
                          {moment(review.createdAt).format("MMM DD, YYYY")}
                        </Typography>
                    </Box>
                  </Box>
                 
                 
                 
                </Box >



                     <Box>
                       <Typography variant="body2" sx={{ ml: 2, mb: 1, p: 0 }}>
                         {review.comment}
                        </Typography>
                      </Box>
               </Box>
              </Grid>
            </>
          ))}
        </Grid>
      </>
  );
};

export default ListReviews;
