package hu.elte.alkfejl.enaplo.repository;

import hu.elte.alkfejl.enaplo.model.UserModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Integer> {
    Optional<UserModel> findByUserName(String username);
}