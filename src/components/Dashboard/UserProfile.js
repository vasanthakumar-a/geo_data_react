import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../../api/auth";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import FileUploadCard from "../Shapes/FileUploadCard";

const UserProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      setUser(null);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const start = (
    <img
      alt="logo"
      src="https://imgs.search.brave.com/cMeR-TEzSzc3L_T_t4c0ZKSZu5B4BxkMPGrZ48urikE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4x/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvZ29vZ2xlLXMt/bG9nby8xNTAvR29v/Z2xlX0ljb25zLTA5/LTUxMi5wbmc"
      className="ml-5 mr-2"
      style={{ width: "40px" }}
    />
  );
  const end = (
    <div className="flex items-center space-x-2">
      <img
        src={
          "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
        }
        alt="Profile"
        className="rounded-full h-10 w-10"
      />
      <span className="pr-5">{user ? user.email : "Guest"}</span>
    </div>
  );

  useEffect(() => {
    if (user) {
      setItems([
        {
          label: "Home",
          icon: "pi pi-home",
          command: () => {
            navigate("/");
          },
        },
        {
          label: "File Upload",
          icon: "pi pi-upload",
          command: () => {
            setVisible(true);
          },
        },
        {
          label: "Custom Draw",
          icon: "pi pi-pencil",
          command: () => {
            navigate("/new");
          },
        },
        {
          label: "Logout",
          icon: "pi pi-sign-out",
          command: () => {
            logoutMutation.mutate();
          },
        },
      ]);
    } else {
      setItems([
        {
          label: "Home",
          icon: "pi pi-home",
          command: () => {
            navigate("/");
          },
        },
        {
          label: "Login",
          icon: "pi pi-sign-in",
          command: () => {
            navigate("/login");
          },
        },
        {
          label: "Sign Up",
          icon: "pi pi-user-plus",
          command: () => {
            navigate("/register");
          },
        },
      ]);
    }
  }, [user]);

  return (
    <div>
      <Menubar model={items} start={start} end={end} />

      <Dialog
        header="File Upload"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <FileUploadCard />
      </Dialog>
    </div>
  );
};

export default UserProfile;
