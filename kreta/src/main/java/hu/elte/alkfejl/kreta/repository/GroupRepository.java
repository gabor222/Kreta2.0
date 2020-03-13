package hu.elte.alkfejl.kreta.repository;

import hu.elte.alkfejl.kreta.model.Group;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends JpaRepository<Group, Integer> {

}