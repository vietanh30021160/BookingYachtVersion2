package com.example.firstDemoHihi.service.service;

import com.example.firstDemoHihi.service.implement.IFile;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileService implements IFile {
    @Override
    public boolean save(MultipartFile file) {
        return false;
    }

    @Override
    public Resource load(String filename) {
        return null;
    }
}
