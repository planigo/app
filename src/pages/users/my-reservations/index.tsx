import { RESERVATION_DATE_FORMAT } from "@/config/dayjs";
import { useGetReservationsBookedByUserQuery } from "@/services/reservation.service";
import { CircularProgress, Container, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import dayjs from "dayjs";
import { User } from "@/models/user.model";
import { useUserStore } from "@/store/user.store";

const UserReservationsPage = () => {
  const currentUser: User = useUserStore((state) => state.currentUser);
  const { data: bookedReservations, isLoading } =
    useGetReservationsBookedByUserQuery(currentUser.id);

  console.log(bookedReservations);

  let content = <CircularProgress />;

  if (!isLoading && bookedReservations?.length === 0) {
    content = <>Vous n&apos;avez pas encore réservé de prestation</>;
  }

  if (!isLoading && bookedReservations && bookedReservations.length > 0) {
    content = (
      <>
        {bookedReservations.map((reservation) => (
          <Grid md={3} key={reservation.reservationId}>
            <Paper sx={{ p: 4, my: 2 }} key={reservation.reservationId}>
              <strong>
                {dayjs(reservation.start).format(RESERVATION_DATE_FORMAT)}
              </strong>
              <p>Boutique: {reservation.shopName}</p>
              <p>Prestation: {reservation.serviceName}</p>
              <p>
                Prix:{" "}
                {new Intl.NumberFormat("fr", {
                  style: "currency",
                  currency: "EUR",
                }).format(reservation.price)}
              </p>
              <p>Temps: {reservation.duration} minutes</p>
            </Paper>
          </Grid>
        ))}
      </>
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
