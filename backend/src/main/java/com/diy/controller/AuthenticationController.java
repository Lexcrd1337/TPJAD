package com.diy.controller;

import com.diy.dto.AuthDTO;
import com.diy.model.User;
import com.diy.repository.UserRepository;
import com.diy.security.jwt.JWTRequest;
import com.diy.security.jwt.JWTTokenUtil;
import com.diy.security.jwt.JWTUserDetailsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthenticationController {
    private final AuthenticationManager authenticationManager;
    private final JWTUserDetailsService userDetailsService;
    private final UserRepository userRepository;
    private final JWTTokenUtil jwtTokenUtil;

    public AuthenticationController(AuthenticationManager authenticationManager, JWTUserDetailsService userDetailsService,
                                    UserRepository userRepository, JWTTokenUtil jwtTokenUtil) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.userRepository = userRepository;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<AuthDTO> createAuthenticationToken(@RequestBody JWTRequest authenticationRequest) throws Exception {
        String username = authenticationRequest.getUsername();
        String password = authenticationRequest.getPassword();
        authenticate(username, password);
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails);
        User user = userRepository.findByUsername(username);

        return ResponseEntity.ok(new AuthDTO(username, user.getRole(), token));
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> saveUser(@RequestBody AuthDTO authDTO) throws Exception {
        return ResponseEntity.ok(userDetailsService.save(authDTO));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}
