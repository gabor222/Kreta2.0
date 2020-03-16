package hu.elte.alkfejl.enaplo.model;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "enaplo_users")
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    private String userName;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String realName;

    @ManyToMany
    @JsonIgnore
    private List<SubjectModel> subjects;

    @ManyToOne
    private ClassModel classModel;

    @Enumerated(EnumType.STRING)
    private Role role;

    public enum Role {
        ROLE_GUEST, ROLE_STUDENT, ROLE_TEACHER, ROLE_ADMIN
    }
}