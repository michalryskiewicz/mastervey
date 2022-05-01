import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Link from "next/link";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">Mastervey</Link>
          </Typography>
          <Button color="inherit" sx={{ mr: 3 }}>
            <Link href="/signup">Signup</Link>
          </Button>
          <Button color="inherit">
            <Link href="/login">Login</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
