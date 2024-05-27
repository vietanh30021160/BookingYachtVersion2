package com.example.firstDemoHihi.security;

import com.example.firstDemoHihi.entity.Account;
import com.example.firstDemoHihi.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
//lay username duoc truyen vao de check su ton tai trong database
//buoc 3
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepository.findAccountByUsername(username);
        if(account == null){
            throw new UsernameNotFoundException(username);
        }
        //return ve mot username, password authen token de so sanh voi username, password authen duoc truyen vao
        return new User(username, account.getPassword(), new ArrayList<>());
    }
}
