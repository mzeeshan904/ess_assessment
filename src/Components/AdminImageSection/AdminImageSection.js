import React from "react";
import Avatar from "@mui/material/Avatar";
import { Typography, Box } from "@mui/material";
import styled from '@emotion/styled';


const ImageSectionContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height:200px;
  align-items: center;
  text-align: center;
`;

const AdminHeadingsContainer = styled(Box)`
margin:1.5rem 0px 0px 0px;
`;

const AdminImageSection = () => {
  return (
    <ImageSectionContainer>
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 75, height: 75 }}
      />
      <AdminHeadingsContainer>
      <Typography>Muhammad Zeeshan </Typography>
      <Typography>Web Development </Typography>
      </AdminHeadingsContainer>
    </ImageSectionContainer>
  );
};

export default AdminImageSection;
