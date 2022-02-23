import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

export default function SessionUrlsComp({ sessionData }) {
  //   let [sessionData,setSessionData] = useState(JSON.parse(sessionStorage.getItem("sessionUrls")));

  return (
    <>
      {sessionData !== null && sessionData.length !== 0 && (
        <TableContainer component={Paper}>
          <Typography variant="h4">Your recent Shorten Urls</Typography>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell align="left" >
                  longUrl
                </TableCell>

                <TableCell align="right">ShortUrl&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sessionData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">

                      {/* {console.log(row,'ROWWWWWWWWWWWW QQQQQQQQQQQQQ')}
                      {console.log(row[1],'ROWWWWWWWWWWWW')} */}
                    {row.longUrl ?
                    row.longUrl.slice(0,100):
                    row[1].longUrl.slice(0,100)}...
                  </TableCell>
                  <TableCell align="right" component="a" href={row.shortUrl}>
                    {row.shortUrl?
                    row.shortUrl:
                    row[1].shortUrl}...
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
