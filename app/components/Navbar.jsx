"use client";
import { Add, Analytics, Camera, CameraAlt, Leaderboard, Person } from "@mui/icons-material";
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
import { Home, MenuIcon, Settings } from "lucide-react";
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
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <div
          style={{ width: 'clamp(280px, 80vw, 450px)' }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          className="bg-back h-full shadow-lg p-[10px] flex flex-col"
        >
          <div className="flex-1">
            <div className="flex items-center justify-between p-4 mb-4 text-mainText">
              <h1 className="text-4xl text-mainText">Menu</h1>
              <MenuIcon className="cursor-pointer"/>
            </div>
            <List>
              {["Home", "Camera", "Leaderboard", "Analytics"].map((text, index) => (
                <Link
                  key={index}
                  className="group hover:ml-2 transition-all transition-400"
                  href={`/${text !== `Home` ? text.toLowerCase() : `/`}`}
                >
                  <ListItem button key={text}>
                    <ListItemText
                      primary={
                        <div className="flex items-center align-center gap-2 text-3xl group-hover:gap-5 transition-all transition-400">
                          <div className="text-main">
                            {text === `Home` ? (
                              <Home className="w-8 h-8" />
                            ) : text === `Camera`? (
                              <CameraAlt className="w-8 h-8" />
                            ):
                            text === `Leaderboard` ? (
                              <Leaderboard className="w-8 h-8" />
                            ) : text === `Analytics` ? (
                              <Analytics className="w-8 h-8" />
                            ) : null}
                          </div>
                          <h2 className="text-mainText group-hover:text-main transition-colors">
                            {text}
                          </h2>
                        </div>
                      }
                    />
                  </ListItem>
                </Link>
              ))}
            </List>
          </div>

          {/* Profile and Settings at bottom */}
          <List className="mt-auto mb-4">
            {[`Profile`, `Settings`].map((text, index) => (
              <Link
                key={index}
                className="group hover:ml-2 transition-all transition-400"
                href={`/${text.toLowerCase()}`}
              >
                <ListItem button key={text}>
                  <ListItemText
                    primary={
                      <div className="flex items-center align-center gap-2 text-3xl group-hover:gap-5 transition-all transition-400">
                        <div className="text-secondaryText">
                          {text === `Profile` ? (
                            <Person className="w-10 h-10" />
                          ) : (
                            <Settings className="w-8 h-8" />
                          )}
                        </div>
                        <h2 className="text-mainText group-hover:text-main transition-colors">
                          {text}
                        </h2>
                      </div>
                    }
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
}
