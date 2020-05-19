package hu.elte.alkfejl.enaplo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "enaplo_marks")
public class MarkModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JsonIgnore
    private SubjectModel subject;

    private Integer studentUserId;

    private Integer teacherUserId;

    private Long timestamp;

    private Integer mark;

    private String description;
}