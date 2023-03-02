import { RESERVATION_DATE_FORMAT } from "@/config/dayjs";
import {
  useCancelReservationQuery,
  useGetReservationsBookedByUserQuery,
} from "@/services/reservation.service";
import {
  Button,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import dayjs from "dayjs";
import { useUserStore } from "@/store/user.store";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import { useState } from "react";

const UserReservationsPage = () => {
  const [prestationToCancel, setPrestationToCancel] = useState("");
  const currentUser = useUserStore((state) => state.currentUser);
  const { data: bookedReservations, isLoading } =
  useGetReservationsBookedByUserQuery(currentUser?.id);

  useCancelReservationQuery(prestationToCancel);

  let content = <CircularProgress />;

  if (!isLoading && bookedReservations?.length === 0) {
    content = <>Vous n&apos;avez pas encore réservé de prestation</>;
  }

  if (!isLoading && bookedReservations && bookedReservations.length > 0) {
    content = (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Prestation</TableCell>
              <TableCell align="left">Boutique</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Durée</TableCell>
              <TableCell align="center">Annulation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookedReservations.map((reservation) => (
              <TableRow
                key={reservation.reservationId}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  <strong>{reservation.isCancelled ? "[Annulé] " : ""}</strong>
                  {reservation.serviceName}
                </TableCell>
                <TableCell align="left">{reservation.shopName}</TableCell>
                <TableCell align="left">
                  {dayjs(reservation.start).format(RESERVATION_DATE_FORMAT)}
                </TableCell>
                <TableCell align="left">
                  {reservation.duration} minutes
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Annuler le rendez-vous" placement="top">
                    <Button
                      color="inherit"
                      onClick={() =>
                        setPrestationToCancel(reservation.reservationId)
                      }
                      disabled={reservation.isCancelled}
                    >
                      <EventBusyIcon
                        sx={{
                          cursor: "pointer",
                        }}
                      />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <Container>
      <h2>Mes réservations</h2>
      <Grid container gap={2}>
        {content}
      </Grid>
    </Container>
  );
};

export default UserReservationsPage;
