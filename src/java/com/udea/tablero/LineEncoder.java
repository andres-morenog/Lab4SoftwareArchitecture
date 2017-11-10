package com.udea.tablero;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;


public class LineEncoder implements Encoder.Text<Line> {

    @Override
    public String encode(Line line) throws EncodeException {
       return line.getJson().toString();
    }

    @Override
    public void init(EndpointConfig config) {
        System.out.println("init");
    }

    @Override
    public void destroy() {
        System.out.println("destroy");
    }
}
