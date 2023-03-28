import { RESERVATION_DATE_FORMAT } from "@/config/dayjs";
import {
  useCancelReservationQuery,
  useGetReservationsBookedByUserQuery,
} from "@/services/reservation.service";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Modal,
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
import { BookedReservation } from "@/models/reservation.model";
import { Poppins } from "@next/font/google";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

const UserReservationsPage = () => {
  const [prestationToCancel, setPrestationToCancel] = useState("");
  const [selectedReservation, setSelectedReservation] =
    useState<BookedReservation>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const currentUser = useUserStore((state) => state.currentUser);
  const { data: bookedReservations, isLoading } =
    useGetReservationsBookedByUserQuery(currentUser?.id);

  const { isLoading: isCancelReservationLoading } =
    useCancelReservationQuery(prestationToCancel);

  let content = <Container>
    Pas de reservation
  </Container>;

  if (isLoading) {
    content = <CircularProgress />
  }

  if (!isLoading && bookedReservations?.length === 0) {
    content = <>Vous n&apos;avez pas encore réservé de prestation</>;
  }

  if (!isLoading && bookedReservations) {
    content = (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          {!isCancelReservationLoading ? (
            <>
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
                      <strong>
                        {reservation.isCancelled ? "[Annulé] " : ""}
                      </strong>
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
                          onClick={() => {
                            setSelectedReservation(reservation);
                            handleOpen();
                          }}
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
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Table>
      </TableContainer>
    );
  }

  const modal = selectedReservation && (
    <Modal open={open} onClose={handleClose} className={poppins.className}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          borderRadius: 1,
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 2,
          }}
        >
          <h2>Annuler la réservation</h2>
          <p>Êtes-vous sûr de vouloir annuler votre réservation ?</p>
          <Grid container gap={2}>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setPrestationToCancel(selectedReservation?.reservationId);
                handleClose();
              }}
            >
              Oui, annuler
            </Button>
            <Button variant="contained" onClick={handleClose}>
              Non, je ne souhaite pas annuler
            </Button>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );

  return (
    <Container
      sx={{
        marginTop: 10,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        paddingBottom: 10,
      }}
    >
      <h2>Mes réservations</h2>
      <Grid container gap={2}>
        {content}
      </Grid>
      {modal}
    </Container>
  );
};

export default UserReservationsPage;
