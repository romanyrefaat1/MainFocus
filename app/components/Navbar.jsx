"use client";
import { Add } from "@mui/icons-material";
import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import Link from "next/link";
import React, { useState } from "react";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        position="static"
        style={{ background: `transparent`, boxShadow: `none` }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            className="text-main"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            MainFocus
          </Typography>
          <Add
            fontSize="large"
            style={{ color: "var(--secondaryText-color)" }}
          />
          {/* Trackin Points */}
          <div className="bg-secondary flex p-3 flex gap-1 rounded">
            <div className="bg-main p-2 rounded-full text-back font-medium text-xs flex items-center align-center">
              <span>100+</span>
            </div>
            <div className="bg-secondaryText p-2 rounded-full text-back font-medium text-xs flex items-center align-center">
              <span>10+</span>
            </div>
          </div>
          {/* Burger Menu Icon */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            {/* <MenuIcon /> */}
            _______
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <div
          style={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {["Home", "About", "Services", "Contact"].map((text, index) => (
              <Link key={index} href={`/${text.toLowerCase()}`}>
                <ListItem button key={text}>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
}
