package com.ctf.controller;

import com.ctf.model.User;
import com.ctf.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
public class MainController {

    @Autowired
    private UserService userService;


    @GetMapping("/")
    public String home(Model model, HttpSession session) {
        User currentUser = (User) session.getAttribute("user");
        model.addAttribute("currentUser", currentUser);


        List<User> topUsers = userService.getTopUsers();
        model.addAttribute("topUsers", topUsers);

        return "index";
    }


    @GetMapping("/auth")
    public String authPage(@RequestParam(value = "register", required = false) String register,
                           @RequestParam(value = "error", required = false) String error,
                           Model model) {
        model.addAttribute("isLogin", register == null);
        if (error != null) {
            model.addAttribute("error", "Неверное имя пользователя или пароль");
        }
        return "auth";
    }


    @PostMapping("/login")
    public String loginUser(
            @RequestParam String username,
            @RequestParam String password,
            HttpSession session,
            Model model) {

        try {

            if (username == null || username.trim().isEmpty()) {
                model.addAttribute("error", "Имя пользователя обязательно");
                model.addAttribute("isLogin", true);
                return "auth";
            }

            if (password == null || password.isEmpty()) {
                model.addAttribute("error", "Пароль обязателен");
                model.addAttribute("isLogin", true);
                return "auth";
            }

            Optional<User> user = userService.authenticate(username.trim(), password);
            if (user.isPresent()) {
                session.setAttribute("user", user.get());
                session.setAttribute("username", user.get().getUsername());
                return "redirect:/";
            } else {
                model.addAttribute("error", "Неверное имя пользователя или пароль");
                model.addAttribute("isLogin", true);
                return "auth";
            }
        } catch (Exception e) {
            model.addAttribute("error", "Ошибка при входе: " + e.getMessage());
            model.addAttribute("isLogin", true);
            return "auth";
        }
    }


    @PostMapping("/register")
    public String registerUser(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam String confirmPassword,
            @RequestParam String email,
            HttpSession session,
            Model model) {

        try {

            if (username == null || username.trim().isEmpty()) {
                model.addAttribute("error", "Имя пользователя обязательно");
                return showRegisterForm(model);
            }

            if (email == null || email.trim().isEmpty()) {
                model.addAttribute("error", "Email обязателен");
                return showRegisterForm(model);
            }

            if (password == null || password.isEmpty()) {
                model.addAttribute("error", "Пароль обязателен");
                return showRegisterForm(model);
            }


            if (!password.equals(confirmPassword)) {
                model.addAttribute("error", "Пароли не совпадают");
                return showRegisterForm(model);
            }


            if (password.length() < 6) {
                model.addAttribute("error", "Пароль должен содержать минимум 6 символов");
                return showRegisterForm(model);
            }


            User user = userService.registerUser(username.trim(), password, email.trim());


            session.setAttribute("user", user);
            session.setAttribute("username", user.getUsername());

            return "redirect:/?registration=success";

        } catch (RuntimeException e) {

            model.addAttribute("error", e.getMessage());
            return showRegisterForm(model);
        }
    }


    private String showRegisterForm(Model model) {
        model.addAttribute("isLogin", false);
        return "auth";
    }


    @GetMapping("/check-username")
    @ResponseBody
    public String checkUsername(@RequestParam String username) {
        if (username == null || username.trim().length() < 3) {
            return "invalid";
        }
        return userService.usernameExists(username.trim()) ? "exists" : "available";
    }


    @GetMapping("/check-email")
    @ResponseBody
    public String checkEmail(@RequestParam String email) {
        if (email == null || email.trim().isEmpty()) {
            return "invalid";
        }
        return userService.emailExists(email.trim().toLowerCase()) ? "exists" : "available";
    }


    @GetMapping("/users")
    public String showUsers(Model model, HttpSession session) {
        User currentUser = (User) session.getAttribute("user");
        model.addAttribute("currentUser", currentUser);

        List<User> users = userService.getAllUsers();
        model.addAttribute("users", users);
        return "users";
    }


    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/";
    }


    @GetMapping("/category/{category}")
    public String showCategory(@PathVariable String category, Model model, HttpSession session) {
        User currentUser = (User) session.getAttribute("user");
        model.addAttribute("currentUser", currentUser);
        model.addAttribute("category", category);

        switch (category.toLowerCase()) {
            case "pwn":
                return "pwn";
            case "web":
                return "web";
            case "crypto":
                return "crypto";
            default:
                return "redirect:/";
        }
    }
}