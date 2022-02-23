import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

import SessionUrlsComp from "./sessionUrls";

const theme = createTheme();

export default function Search() {
  // const [check, setCheck] = useState(
  //   JSON.parse(sessionStorage.getItem("sessionUrls"))
  // );
  // console.log(check, "check");
  let sessionData = JSON.parse(sessionStorage.getItem("sessionUrls"));
  console.log(typeof sessionData);
  const [sessionUrls, setSessionUrls] = useState(
    sessionData !== null && sessionData !== undefined
      ? Object.values(JSON.parse(sessionStorage.getItem("sessionUrls")))
      : []
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    let obj = {
      longUrl: data.get("longUrl"),
      slug: data.get("slug"),
    };
    console.log("data obj ", obj);
    if (obj.longUrl !== "") {
      fetch("http://localhost:5000/api/url/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((response) => response.json())
        .then((res) => {
          // console.log("Success:", res);
          if (res.longUrl) {
            document.getElementById("longUrl").value = "";
            document.getElementById("slug").value = "";
            setSessionUrls([...sessionUrls, res]);
          }
          sessionStorage.setItem("sessionUrls", JSON.stringify(sessionUrls));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.log("url can not be empty");
    }
    console.log(sessionUrls, "session in submit");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Shorten Your Url
          </Typography>
          <Box
            style={{ width: "-webkit-fill-available" }}
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <TextField
                  autoComplete="url"
                  name="longUrl"
                  required
                  fullWidth
                  id="longUrl"
                  label="Shorten your link"
                  autoFocus
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="slug"
                  label="Slug"
                  name="slug"
                  autoComplete="slug"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Shorten
            </Button>
          </Box>
        </Box>
        {/* {console.log(setSessionData,'setSessionData')} */}

        <SessionUrlsComp sessionData={sessionUrls} />
      </Container>
    </ThemeProvider>
  );
}
