import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "next/link";
import { useUserStore } from "@/store/user.store";
import { removeToken } from "@/helpers/localstorage.helper";
import { useRouter } from "next/router";
import { useState } from "react";
import { Modal, Snackbar } from "@mui/material";
import Login from "./Login";
import Register from "./Register";

const settings = [
  {
    label: "Backoffice",
    path: "/admin/dashboard",
    role: "owner",
  },
  {
    label: "Mes réservations",
    path: "/users/my-reservations",
  },
  {
    label: "Déconnexion",
    path: "#",
    onClick: () => {
      useUserStore.getState().setCurrentUser(null);
      removeToken();
    },
  },
];

function ResponsiveAppBar() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element>();
  const currentUser = useUserStore((state) => state.currentUser);

  const textColor =
    router.pathname === "/"
      ? {
          color: "white",
          "&:hover": {
            color: "#E6E6E6",
          },
        }
      : {
          color: "black",
          "&:hover": {
            color: "#2D2E2E",
          },
        };

  return (
    <AppBar
      color="transparent"
      sx={{
        boxShadow: "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link href="/">
            <Typography
              sx={{
                fontFamily: `zanna`,
                ...textColor,
                fontSize: "1.3rem",
                letterSpacing: "0.15rem",
              }}
            >
              PLANIGO
            </Typography>
          </Link>
          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              color: "white",
              gap: 2,
            }}
          >
            {currentUser ? (
              settings.map((setting, index) => {
                if (setting.role && setting.role !== currentUser.role) {
                  return null;
                }
                return (
                  <Link
                    href={setting.path}
                    key={index}
                    onClick={() => {
                      setting.onClick?.();
                    }}
                  >
                    <Typography textAlign="center" sx={textColor}>
                      {setting.label}
                    </Typography>
                  </Link>
                );
              })
            ) : (
              <>
                <Link
                  href="#"
                  onClick={() => {
                    setIsModalOpen((prev) => !prev);
                    setModalContent(
                      <Login closeModal={() => setIsModalOpen(false)} />
                    );
                  }}
                >
                  <Typography textAlign="center" sx={textColor}>
                    Se connecter
                  </Typography>
                </Link>
                <Link
                  href="#"
                  onClick={() => {
                    setIsModalOpen((prev) => !prev);
                    setModalContent(
                      <Register
                        closeModal={() => setIsModalOpen(false)}
                        openSnackbar={() => setSnackbarOpen(true)}
                      />
                    );
                  }}
                >
                  <Typography textAlign="center" sx={textColor}>
                    S&apos;enregister
                  </Typography>
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: 1,
              padding: 2,
            }}
          >
            {modalContent}
          </Box>
        </Modal>
        <Snackbar
          open={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
          message="🎉 Votre inscription a bien été prise en compte, veuillez vous connecter."
        />
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
