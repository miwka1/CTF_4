package com.ctf.repository;

import com.ctf.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Проверка существования пользователя по username
    boolean existsByUsername(String username);
    
    // Проверка существования пользователя по email
    boolean existsByEmail(String email);
    
    // Поиск пользователя по username
    Optional<User> findByUsername(String username);
    
    // Получение топа пользователей по очкам
    @Query("SELECT u FROM User u ORDER BY u.score DESC")
    List<User> findTopUsers();
    
    // Получение всех пользователей с сортировкой по дате создания
    @Query("SELECT u FROM User u ORDER BY u.createdAt DESC")
    List<User> findAllOrderByCreatedAt();
    
    // Поиск по email
    Optional<User> findByEmail(String email);
}