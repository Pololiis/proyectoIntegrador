package com.proyectoIntegrador.gameShare.servicio;

import com.amazonaws.services.s3.AmazonS3;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class S3Servicio {
    private Environment env;
    private AmazonS3 s3Client;
    private String nombreBucket;

    public S3Servicio(Environment env, AmazonS3 s3Client) {
        this.env = env;
        this.s3Client = s3Client;
        this.nombreBucket = this.env.getProperty("aws.s3.bucket");
    }
    public void subirImagen(String nombreImagen, MultipartFile imagen) throws IOException {
        var putObjectResult = s3Client.putObject(nombreBucket, nombreImagen, imagen.getInputStream(), null);
    }
    public String construirUriImagen(String nombreImagen) {
        String imagenUrl = s3Client.getUrl(nombreBucket, nombreImagen).toString();
        return imagenUrl;
    }
}
