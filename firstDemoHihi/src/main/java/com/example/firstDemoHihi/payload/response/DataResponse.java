package com.example.firstDemoHihi.payload.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL) // không hiển thị những field null ở JSON
public class DataResponse<T> {
    private int status = 200;
    private boolean success = true;
    private String desc;
    private T data;
}
