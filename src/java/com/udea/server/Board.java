
package com.udea.server;

import com.udea.tablero.Line;
import com.udea.tablero.LineDecoder;
import com.udea.tablero.LineEncoder;
import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;


@ServerEndpoint( value="/tablero", encoders ={LineEncoder.class}, decoders ={LineDecoder.class})
public class Board {
private static Set<Session> peers=
            Collections.synchronizedSet(new HashSet<Session>());
    
    @OnMessage
    public void broadcastFigure(Line line, Session session) throws IOException, EncodeException {
        System.out.println("Line:" + line);
        for(Session peer: peers){
            if(!peer.equals(session)){
                peer.getBasicRemote().sendObject(line);
            }
        }
    }

    @OnOpen
    public void onOpen(Session peer) {
        peers.add(peer);
    }

    @OnClose
    public void onClose(Session peer) {
        peers.remove(peer);
    }
}
