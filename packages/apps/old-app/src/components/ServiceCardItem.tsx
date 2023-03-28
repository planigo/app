import Link from "next/link";
import { Service } from "@/models/service.model";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { useUserStore } from "@/store/user.store";
import dynamic from "next/dynamic";

type ServiceCardProps = {
  shopId: string;
  service: Service;
  nextAvailableReservationSlot: string;
};

export const ServiceCardItem = ({
  shopId,
  service,
  nextAvailableReservationSlot,
}: ServiceCardProps) => {
  const currentUser = useUserStore((state) => state.currentUser);
  let tooltipTitle = "Vous devez être connecté pour réserver un créneau";

  if (currentUser) {
    tooltipTitle = "";
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom component="div">
          {service.name}
        </Typography>
        <Typography variant="body2">{service.description}</Typography>
        <Typography variant="body2">
          {new Intl.NumberFormat("fr", {
            style: "currency",
            currency: "EUR",
          }).format(service.price)}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <AccessTimeOutlinedIcon /> {service.duration} min
        </Typography>
        <Typography variant="body2">
          Prochaine dispo le : {nextAvailableReservationSlot}
        </Typography>
      </CardContent>
      <CardActions>
        <Tooltip title={tooltipTitle}>
          <span>
            <Button variant="outlined" disabled={!!!currentUser}>
              <Link
                href={`/shops/${shopId}/reservation?serviceId=${service.id}`}
              >
                Réserver
              </Link>
            </Button>
          </span>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default dynamic(() => Promise.resolve(ServiceCardItem), {
  ssr: false,
});
