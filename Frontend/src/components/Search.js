import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function Search() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let obj = {
      name: data.get("longUrl"),
      email: data.get("slug"),
    };
    console.log("data obj ", obj);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" >
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
          style={{width: "-webkit-fill-available"}}
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <TextField
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
                  autoComplete="email"
                />
              </Grid>
            </Grid>
          </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Shorten
            </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
