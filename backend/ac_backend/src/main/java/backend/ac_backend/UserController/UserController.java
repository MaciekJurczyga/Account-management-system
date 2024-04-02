package backend.ac_backend.UserController;



import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @GetMapping
    public ResponseEntity<String> sayHello(){
        return ResponseEntity.ok("hello");
    }
}
