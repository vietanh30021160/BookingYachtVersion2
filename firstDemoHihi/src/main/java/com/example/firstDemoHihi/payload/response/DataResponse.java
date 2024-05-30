package com.example.firstDemoHihi.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DataResponse<T>{
    private int status = 200;
    private boolean success = true;
    private String desc;
    private Object data;

    public DataResponse() {
    }
}
