import React, { createContext, useContext, useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  // CardHeader,
  Typography,
  Zoom
} from "@material-ui/core";

// import InfoIcon from "@material-ui/icons/Info";
// import SuccessIcon from "@material-ui/icons/CheckCircle";
// import WarningIcon from "@material-ui/icons/Warning";
// import ErrorIcon from "@material-ui/icons/Error";

// Context
const Context = createContext();

// Hook
export function useNotifications() {
  return useContext(Context);
}

// Provider
export function NotificationsProvider({ children }) {
  const [ns, set] = useState(load());

  useEffect(() => {
    store(ns);
  }, [ns]);

  const dismiss = id => {
    // console.log(
    //   "dismiss",
    //   id,
    //   ns,
    //   ns.filter(n => n.id !== id)
    // );
    set(ns.filter(n => n.id !== id));
  };

  const push = (n = { content: "", type: "info", href: false }) => {
    // console.log(id, n.content);
    set(ns => [
      ...ns,
      { ...n, id: Math.max(0, ...ns.map(({ id }) => id)) + 1 }
    ]);
  };

  return (
    <Context.Provider value={[ns, push, dismiss]}>{children}</Context.Provider>
  );
}

// Storage key
const storage = "notifications";

// Store obj to localStorage with storage key
function store(obj) {
  try {
    localStorage.setItem(storage, JSON.stringify(obj));
  } catch (err) {
    console.error(err);
  }
}

// Load from localStorage with storage key
function load() {
  try {
    return JSON.parse(localStorage.getItem(storage)) || [];
  } catch {
    return [];
  }
}

// Card styles
const useStyles = makeStyles(
  ({ palette: { info, success, warning, error } }) => ({
    info: { backgroundColor: info.main, color: info.contrastText },
    success: { backgroundColor: success.main, color: success.contrastText },
    warning: { backgroundColor: warning.main, color: warning.contrastText },
    error: { backgroundColor: error.main, color: error.contrastText }
  })
);

// Main component
export default function Notifications() {
  const [ns, _, dismiss] = useNotifications();
  // Get the first notification
  const [first] = ns;
  // There are no notifications
  if (!first) return null;
  // Render
  return [
    <NotificationContainer key={ns.length} {...first} dismiss={dismiss} />
  ];
}

function NotificationContainer({ id, content, href, dismiss, type }) {
  const { push } = useHistory();
  const theme = useTheme();
  const classes = useStyles();
  const [zoom, setZoom] = useState(true);
  const [open, setOpen] = useState(false);
  // Effect
  useEffect(() => {
    if (!zoom) {
      const to = setTimeout(() => {
        dismiss(id);
        if (open) {
          push(href);
        }
      }, theme.transitions.duration.standard);
      return () => clearTimeout(to);
    }
  }, [zoom]);
  // Define handlers
  const handleClose = () => {
    setZoom(false);
  };
  const handleOpen = () => {
    setZoom(false);
    setOpen(true);
  };
  // Render
  return (
    <Zoom in={zoom}>
      <NotificationCard
        type={type}
        content={content}
        handleOpen={!!href && handleOpen}
        handleClose={handleClose}
      />
    </Zoom>
  );
}

export function NotificationCard({ type, content, handleOpen, handleClose }) {
  const classes = useStyles();

  return (
    <Card className={classes[type]}>
      <CardContent>
        <Typography>{content}</Typography>
      </CardContent>
      <CardActions>
        {!!handleOpen && (
          <Button
            size="small"
            title="Apri"
            color="inherit"
            variant="outlined"
            onClick={handleOpen}
          >
            Apri
          </Button>
        )}

        <Button
          size="small"
          title="Ignora notifica"
          color="inherit"
          variant="outlined"
          onClick={handleClose}
        >
          Ignora
        </Button>
      </CardActions>
    </Card>
  );
}
