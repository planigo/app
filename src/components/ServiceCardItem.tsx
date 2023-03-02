import Link from "next/link";
import { Service } from "@/models/service.model";
import { Button, Paper, Tooltip } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { useUserStore } from "@/store/user.store";

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
    <section>
      <Paper
        square={true}
        elevation={3}
        sx={{
          p: 1,
          my: 4,
        }}
      >
        <h3>{service.name}</h3>
        <p>{service.description}</p>
        <p>
          {new Intl.NumberFormat("fr", {
            style: "currency",
            currency: "EUR",
          }).format(service.price)}
        </p>
        <p>
          <AccessTimeOutlinedIcon /> {service.duration} min
        </p>
        <div>
          <p>Prochaine dispo le : {nextAvailableReservationSlot}</p>
          <Tooltip title={tooltipTitle}>
            <span>
              <Button variant="outlined" disabled={!!currentUser}>
                <Link
                  href={`/shops/${shopId}/reservation?serviceId=${service.id}`}
                >
                  Réserver
                </Link>
              </Button>
            </span>
          </Tooltip>
        </div>
      </Paper>
    </section>
  );
};

export default ServiceCardItem;
