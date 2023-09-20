import { useSelector } from "react-redux";
import * as React from "react";
import moment from "moment";
import * as R from "ramda";
import classNames from "classnames";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  coinPricesSelector,
  exchangersSelector,
} from "../../modules/CoinsPrices/selectors";
import "./styles.scss";

export const ScannerTableRow = ({ pair, prices }) => {
  const exchangers = useSelector(exchangersSelector);
  const [open, setOpen] = React.useState(false);
  if (R.isEmpty(prices)) {
    return null;
  }
  const lastPrices = R.pathOr({}, [0])(prices);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell className="cell">
          <span className="bold">{pair}</span>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {exchangers.map((exchanger) => {
          const { buy = "", sell = "" } = lastPrices[exchanger];
          return (
            <TableCell
              className={classNames({
                cell: true,
                bgGreen: lastPrices.minBuyPrice === buy,
                bgRed: lastPrices.maxSellPrice === sell,
              })}
              key={exchanger}
            >
              <span className="greenColor">{buy}</span>
              <span>{" / "}</span>
              <span className="redColor">{sell}</span>
            </TableCell>
          );
        })}
      </TableRow>
      <TableRow>
        <TableCell colSpan={8} className="full-table-cell">
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="purchases">
              <TableBody>
                {prices.map((pairPrices) => (
                  <TableRow>
                    <TableCell className="cell">
                      {moment(pairPrices.date).format("LTS")}
                    </TableCell>
                    {exchangers.map((exchanger) => {
                      const { buy = "", sell = "" } = pairPrices[exchanger];
                      return (
                        <TableCell
                          className={classNames({
                            cell: true,
                            bgGreen: pairPrices.minBuyPrice === buy,
                            bgRed: pairPrices.maxSellPrice === sell,
                          })}
                          key={exchanger}
                        >
                          <span className="greenColor">{buy}</span>
                          <span>{" / "}</span>
                          <span className="redColor">{sell}</span>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export const ScannerTable = () => {
  const coinsPrices = useSelector(coinPricesSelector);
  const exchangers = useSelector(exchangersSelector);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "calc(100vh - 2rem)" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className="cell" />
              {exchangers.map((exchanger) => (
                <TableCell key={exchanger}>
                  <span className="bold">{exchanger}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(coinsPrices).map(([pair, prices]) => (
              <React.Fragment key={pair}>
                <ScannerTableRow pair={pair} prices={prices} />
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
