import React, { createContext, useContext, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";

import { Button, Typography } from "@material-ui/core";

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

  const dismiss = (id) => {
    set(ns.filter((n) => n.id !== id));
  };

  const push = (n = { content: "", type: "info", href: false }) => {
    // console.log(id, n.content);
    set((ns) => [
      ...ns,
      { ...n, id: Math.max(0, ...ns.map(({ id }) => id)) + 1 },
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

// Main component
export default function Notifications() {
  const [ns, _, dismiss] = useNotifications();
  // Get the first notification
  const [first] = ns;
  // There are no notifications
  if (!first) return null;
  // Render
  return [
    <NotificationContainer key={ns.length} {...first} dismiss={dismiss} />,
  ];
}

function NotificationContainer({ id, content, href, dismiss, type }) {
  const { push } = useHistory();
  // Define handlers
  const handleClose = () => {
    dismiss(id);
  };
  const handleOpen = () => {
    dismiss(id);
    push(href);
  };
  // Render
  return (
    <NotificationAlert
      type={type}
      content={content}
      handleOpen={!!href && handleOpen}
      handleClose={handleClose}
    />
  );
}

export function NotificationAlert({ type, content, handleOpen, handleClose }) {
  const { t } = useTranslation();
  return (
    <Alert severity={type} onClose={handleClose} closeText={t("Close")}>
      <AlertTitle>
        {t(type.slice(0, 1).toUpperCase() + type.slice(1))}
      </AlertTitle>
      <Typography paragraph variant="body2">
        {content}
      </Typography>
      {!!handleOpen && (
        <Button
          size="small"
          title={t("Open")}
          color="inherit"
          variant="outlined"
          onClick={handleOpen}
        >
          {t("Open")}
        </Button>
      )}
    </Alert>
  );
}
