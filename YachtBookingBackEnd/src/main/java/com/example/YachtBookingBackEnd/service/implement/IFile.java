package com.example.YachtBookingBackEnd.service.implement;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface IFile {
    boolean save(MultipartFile file);
    Resource load(String filename);
}
