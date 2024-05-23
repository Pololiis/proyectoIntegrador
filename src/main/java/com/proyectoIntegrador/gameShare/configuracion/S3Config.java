package com.proyectoIntegrador.gameShare.configuracion;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

import lombok.AllArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@AllArgsConstructor
public class S3Config {
    private Environment env;
    @Bean
    public AmazonS3 s3client() {
        String awsClaveAcceso = env.getProperty("aws.access.key");
        String awsClaveSecreta = env.getProperty("aws.secret.key");

        BasicAWSCredentials awsCredenciales = new BasicAWSCredentials(awsClaveAcceso, awsClaveSecreta);
        return AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCredenciales))
                .withRegion(Regions.SA_EAST_1)
                .build();
    }
}
