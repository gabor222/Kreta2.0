package hu.elte.alkfejl.enaplo.repository;

import hu.elte.alkfejl.enaplo.model.SubjectModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectRepository extends JpaRepository<SubjectModel, Integer> {

}