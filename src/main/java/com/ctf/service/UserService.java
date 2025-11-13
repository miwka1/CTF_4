package com.ctf.service;

import com.ctf.model.User;
import com.ctf.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    /**
     * Регистрация нового пользователя
     */
    public User registerUser(String username, String password, String email) {
        // Проверка на пустые поля
        if (username == null || username.trim().isEmpty()) {
            throw new RuntimeException("Имя пользователя не может быть пустым");
        }
        
        if (password == null || password.trim().isEmpty()) {
            throw new RuntimeException("Пароль не может быть пустым");
        }
        
        if (email == null || email.trim().isEmpty()) {
            throw new RuntimeException("Email не может быть пустым");
        }
        
        // Нормализация данных
        username = username.trim();
        email = email.trim().toLowerCase();
        
        // Проверка длины username
        if (username.length() < 3) {
            throw new RuntimeException("Имя пользователя должно содержать минимум 3 символа");
        }
        
        // Проверка длины пароля
        if (password.length() < 6) {
            throw new RuntimeException("Пароль должен содержать минимум 6 символов");
        }
        
        // Проверка формата email
        if (!isValidEmail(email)) {
            throw new RuntimeException("Некорректный формат email");
        }
        
        // Проверка уникальности username
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Имя пользователя '" + username + "' уже занято");
        }
        
        // Проверка уникальности email
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email '" + email + "' уже используется");
        }
        
        try {
            // Создание и сохранение пользователя
            User user = new User();
            user.setUsername(username);
            user.setPassword(passwordEncoder.encode(password)); // Хеширование пароля
            user.setEmail(email);
            user.setScore(0);
            user.setRole("USER");
            
            return userRepository.save(user);
            
        } catch (Exception e) {
            throw new RuntimeException("Ошибка при сохранении пользователя: " + e.getMessage());
        }
    }
    
    /**
     * Аутентификация пользователя
     */
    public Optional<User> authenticate(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            return user;
        }
        return Optional.empty();
    }
    
    /**
     * Получение всех пользователей
     */
    public List<User> getAllUsers() {
        return userRepository.findAllOrderByCreatedAt();
    }
    
    /**
     * Получение топа пользователей
     */
    public List<User> getTopUsers() {
        return userRepository.findTopUsers();
    }
    
    /**
     * Проверка существования username
     */
    public boolean usernameExists(String username) {
        return userRepository.existsByUsername(username.trim());
    }
    
    /**
     * Проверка существования email
     */
    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email.trim().toLowerCase());
    }
    
    /**
     * Поиск пользователя по ID
     */
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
    
    /**
     * Обновление пользователя
     */
    public User save(User user) {
        return userRepository.save(user);
    }
    
    /**
     * Удаление пользователя
     */
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    
    /**
     * Валидация email
     */
    private boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
        return email.matches(emailRegex);
    }
    
    /**
     * Получение пользователя по username
     */
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    
    /**
     * Получение пользователя по email
     */
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}