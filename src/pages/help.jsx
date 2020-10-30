import React, { useEffect } from "react";

// import {Link} from 'react-router-dom'

import { Button, IconButton } from "@material-ui/core";

import { BackIconButton, Content, Header, Page, Push } from "mastro-elfo-mui";

import { H1, H2, H3, P, UL, LI, EM } from "./help/HelpContent";

import AddIcon from "@material-ui/icons/Add";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import BackspaceIcon from "@material-ui/icons/Backspace";
import DoneIcon from "@material-ui/icons/AssignmentTurnedIn";
import EditIcon from "@material-ui/icons/Edit";
import HelpIcon from "@material-ui/icons/Help";
import MenuIcon from "@material-ui/icons/Menu";
import MinusBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import PrintIcon from "@material-ui/icons/Print";
import SaveIcon from "@material-ui/icons/Save";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import StorageIcon from "@material-ui/icons/Storage";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { NotificationCard } from "../components/notifications";

function Component() {
  useEffect(() => {
    document.title = "Teepee - Aiuto";
  }, []);

  return (
    <Page
      header={
        <Header LeftAction={<BackIconButton title="Torna indietro" />}>
          Aiuto
        </Header>
      }
      content={
        <Content>
          <H1>Prodotti</H1>
          <H2>Aggiungere un prodotto al database</H2>
          <P>
            Nella pagina principale (Dashboard), aprire il menù cliccando
            sull'icona in alto a sinistra <MenuIcon />, poi selezionare la
            pagina{" "}
            <Push
              Component={Button}
              href="/product"
              color="primary"
              variant="contained"
              size="small"
            >
              Prodotti
            </Push>
            , infine sull'icona in alto a destra{" "}
            <Push
              Component={IconButton}
              href="/product/c"
              color="primary"
              size="small"
            >
              <AddIcon />
            </Push>
            .
          </P>
          <P>
            Dopo aver compilato i campi, cliccare sull'icona di salvataggio in
            alto a destra <SaveIcon />.
          </P>

          <H2>Modificare un prodotto</H2>
          <P>
            Nella pagina principale (Dashboard), aprire il menù cliccando
            sull'icona in alto a sinistra <MenuIcon />, poi selezionare la
            pagina{" "}
            <Push
              Component={Button}
              href="/product"
              color="primary"
              variant="contained"
              size="small"
            >
              Prodotti
            </Push>
            .
          </P>
          <P>
            Cercare il prodotto inserendo il codice a barre, oppure il nome,
            oppure la descrizione (la ricerca non fa differenza fra maiuscole e
            minuscole), poi cliccare sul risultato corrispondente.
          </P>
          <P>
            Dopo aver modificato i campi, cliccare sull'icona di salvataggio in
            alto a destra <SaveIcon />.
          </P>

          <H2>Eliminare un prodotto</H2>
          <P>
            Nella pagina principale (Dashboard), aprire il menù cliccando
            sull'icona in alto a sinistra <MenuIcon />, poi selezionare la
            pagina{" "}
            <Push
              Component={Button}
              href="/product"
              color="primary"
              variant="contained"
              size="small"
            >
              Prodotti
            </Push>
            .
          </P>
          <P>
            Cercare il prodotto inserendo il codice a barre, oppure il nome,
            oppure la descrizione (la ricerca non fa differenza fra maiuscole e
            minuscole), poi cliccare sul risultato corrispondente.
          </P>
          <P>
            Per eliminare definitivamente il prodotto dal database, cliccare sul
            bottone in fondo alla pagina{" "}
            <Button variant="outlined" color="primary" size="small">
              Elimina
            </Button>
            .
          </P>

          <H1>Spesa</H1>
          <H2>Iniziare una nuova spesa</H2>
          <P>
            Nella pagina principale (Dashboard), aprire il menù cliccando
            sull'icona in alto a sinistra <MenuIcon />, poi selezionare la
            pagina{" "}
            <Push
              Component={Button}
              href="/cart"
              color="primary"
              variant="contained"
              size="small"
            >
              Carrello
            </Push>
            .
          </P>
          <P>
            Cercare il prodotto che si vuole aggiungere al carrello inserendo il
            codice a barre, oppure il nome, oppure la descrizione (la ricerca
            non fa differenza fra maiuscole e minuscole).
          </P>
          <P>
            Se la corrispondenza col codice a barre è esatta, il prodotto viene
            aggiunto automaticamente, altrimenti basta cliccare sul risultato
            corrispondente.
          </P>
          <P>
            Si può regolare la quantità cliccando sui bottoni corrispondenti{" "}
            <AddBoxIcon /> <MinusBoxIcon /> <BackspaceIcon />.
          </P>

          <H2>Chiudere una spesa</H2>
          <P>
            Nella pagina principale (Dashboard), aprire il menù cliccando
            sull'icona in alto a sinistra <MenuIcon />, poi selezionare la
            pagina{" "}
            <Push
              Component={Button}
              href="/cart"
              color="primary"
              variant="contained"
              size="small"
            >
              Carrello
            </Push>
            .
          </P>
          <P>
            Cliccare sull'icona in alto a destra <DoneIcon /> e selezionare
            l'azione desiderata:
          </P>
          <UL>
            <LI>
              <EM>Stampa la ricevuta</EM>, per salvare in formato PDF una copia
              della lista prodotti acquistati;
            </LI>
            <LI>
              <EM>Chiudi spesa</EM>, per terminare l'operazione e aggiornare sul
              database le quantità in magazzino;
            </LI>
            <LI>
              <EM>Annulla spesa</EM>, per eliminare il carrello senza agiornare
              il database.
            </LI>
          </UL>

          <H1>Magazzino</H1>
          <H2>Aggiornare le quantità in magazzino</H2>
          <P>
            Nella pagina principale (Dashboard), aprire il menù cliccando
            sull'icona in alto a sinistra <MenuIcon />, poi selezionare la
            pagina{" "}
            <Push
              Component={Button}
              href="/stock"
              color="primary"
              variant="contained"
              size="small"
            >
              Magazzino
            </Push>
            .
          </P>
          <P>
            Cercare il prodotto da aggiornare inserendo il codice a barre,
            oppure il nome, oppure la descrizione (la ricerca non fa differenza
            fra maiuscole e minuscole).
          </P>
          <P>
            Se la corrispondenza col codice a barre è esatta, il prodotto viene
            aggiunto automaticamente, altrimenti basta cliccare sul risultato
            corrispondente.
          </P>
          <P>
            Ogni volta che un prodotto è aggiunto, la quantità è automaticamente
            incrementata di 1.
          </P>
          <P>
            Si può regolare la quantità cliccando sui bottoni corrispondenti{" "}
            <AddBoxIcon /> <MinusBoxIcon /> <BackspaceIcon />.
          </P>
          <P>
            La colonna <EM>Quantità</EM> indica il numero totale di prodotti
            (quelli già presenti più quelli che vengono aggiunti).
          </P>
          <P>
            Le modifiche al magazzino non sono immediatamente salvate sul
            database. Per completare la procedura è necessario cliccare
            sull'icona in alto a destra e selezionare l'azione desiderata:
          </P>
          <UL>
            <LI>
              <EM>Applica le modifiche</EM>, per applicare le modifiche ed
              aggiornare il database;
            </LI>
            <LI>
              <EM>Scarta le modifiche</EM>, per annullare le modifiche senza
              aggiornare il database.
            </LI>
          </UL>

          <H1>Pagina principale (Dashboard)</H1>
          <H3>
            La pagina principale consente un rapido accesso alle funzioni
            principali.
          </H3>
          <P>
            Cliccare sull'icona in alto a sinistra <MenuIcon /> per aprire il
            menù e accedere alle diverse pagine dell'applicazione.
          </P>
          <P>
            Cliccare l'icona in alto a destra{" "}
            <Push
              Component={IconButton}
              href="/cart"
              color="primary"
              size="small"
            >
              <ShoppingBasketIcon />
            </Push>{" "}
            per accedere rapidamente al carrello. Quando ci sono prodotti nel
            carrello l'icona mostra la quantità.
          </P>
          <P>
            I risultati di ricerca nella pagina principale mostrano le
            informazioni principali di ogni prodotto. Per ogni risultato sono
            presenti diverse azioni rapide:
          </P>
          <UL>
            <LI>
              <VisibilityIcon /> per aprire la scheda prodotto;
            </LI>
            <LI>
              <AddShoppingCartIcon /> per aggiungere il prodotto al carrello;
            </LI>
            <LI>
              <StorageIcon /> per gestire la quantità in magazzino del prodotto.
            </LI>
          </UL>

          <P>
            Quando l'applicazione riscontra un problema, ad esempio con il
            calcolo delle quantità in magazzino, visualizza un messaggio nella
            pagina principale, ad esempio:
          </P>

          <NotificationCard
            type="warning"
            content='Ho riscontrato un problema con la quantità di "Prodotto" (1234567890) in magazzino. Controlla quanti prodotti sono presenti e, se necessario, aggiorna il database.'
            handleOpen={() => {}}
            handleClose={() => {}}
          />

          <H1>Impostazioni</H1>
          <H2>Cambiare il tema chiaro/scuro</H2>
          <P>
            Nella pagina principale (Dashboard), aprire il menù cliccando
            sull'icona in alto a sinistra <MenuIcon />, poi selezionare la
            pagina{" "}
            <Push
              Component={Button}
              href="/settings"
              color="primary"
              variant="contained"
              size="small"
            >
              Impostazioni
            </Push>
            .
          </P>
          <P>
            Cliccare sulla riga corrispondente al <EM>Tema</EM> per invertire i
            colori chiaro/scuro.
          </P>

          <P></P>
        </Content>
      }
      TopFabProps={{ color: "primary" }}
    />
  );
}

export const route = {
  path: "/help",
  exact: true,
  component: Component
};

export const drawer = {
  key: "help",
  primary: "Aiuto",
  secondary: "",
  icon: <HelpIcon />,
  title: "Aiuto"
};
