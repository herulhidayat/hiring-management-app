import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Popover } from "@mui/material";
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

function Header() {
  const  { t } = useTranslation();
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (page: { id: string; name: string; path: string }) => {
    router.push(page?.path);
    handleCloseNavMenu();
  };

  return (
    <AppBar position="static" color="transparent" style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.1)" }}>
      <div className="backdrop-blur-md">
        <Container className="h-[3.25rem] flex items-center">
          <Toolbar disableGutters className="flex gap-4 md:justify-between w-full">
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                
                  <MenuItem>
                    <Typography sx={{ textAlign: "center" }}>
                      Logout
                    </Typography>
                  </MenuItem>
              </Menu>
            </Box>
            <div className="flex items-center gap-4">
              <div className="cursor-pointer" onClick={() => router.push("/")}>
                <Image src="/assets/logo.png" alt="logo" height={50} width={145} />
              </div>
              <div className="border-l border-neutral-40 pl-4 font-medium text-gray-600">
                  Job List
              </div>
            </div>
            <div className="flex items-center gap-4">
              <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                  <div>
                    <div {...bindTrigger(popupState)} className="flex gap-1 items-center text-gray-600 cursor-pointer">
                      <CorporateFareIcon />
                      <p className="text-sm">For Corporate</p>
                    </div>
                    <Popover
                      {...bindPopover(popupState)}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      sx={{
                        mt: 1,
                        '& .MuiPopover-paper': {
                          width: '100%',
                          maxWidth: 200,
                          overflow: 'visible',
                          boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.1)',
                        },
                      }}
                    >
                      <Button
                        sx={{
                          p: 2,
                          width: '100%',
                          textAlign: 'left',
                          color: 'var(--color-neutral-800)',
                          justifyContent: 'flex-start',
                          textTransform: 'none',
                          '&:hover': {
                            backgroundColor: 'var(--color-primary-surface)',
                          }
                        }}
                        onClick={() => {
                          router.push('/jobs-management');
                        }}
                      >
                        <p className="text-sm">Talent Hiring</p>
                      </Button>
                    </Popover>
                  </div>
                )}
              </PopupState>
              <div className="border-l border-neutral-40 pl-4 max-lg:hidden">
                <div>
                  <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                      <div>
                        <div {...bindTrigger(popupState)} className="cursor-pointer">
                          <Image src="/assets/avatar.svg" alt="user" className="border border-neutral-40 rounded-full" height={28} width={28} />
                        </div>
                        <Popover
                          {...bindPopover(popupState)}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                          }}
                          sx={{
                            mt: 1,
                            '& .MuiPopover-paper': {
                              width: '100%',
                              maxWidth: 200,
                              overflow: 'visible',
                              boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.1)',
                            },
                          }}
                        >
                          <Button
                            sx={{
                              p: 2,
                              width: '100%',
                              textAlign: 'left',
                              color: 'var(--color-neutral-800)',
                              justifyContent: 'flex-start',
                              textTransform: 'none',
                              '&:hover': {
                                backgroundColor: 'var(--color-primary-surface)',
                              }
                            }}
                          >
                            <p className="text-sm">Logout</p>
                          </Button>
                        </Popover>
                      </div>
                    )}
                  </PopupState>
                </div>
            </div>
            </div>
          </Toolbar>
        </Container>
      </div>
    </AppBar>
  );
}
export default Header;
