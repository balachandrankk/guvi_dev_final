pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_DIR = "${env.WORKSPACE}"  // Defines where Docker Compose will run
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/balachandrankk/guvi_dev_final.git'
            }
        }

        stage('Build and Run') {
            steps {
                script {
                    dir("${env.WORKSPACE}") {
                        sh 'docker-compose down || true'
                        sh 'docker-compose up -d --build'
                    }
                }
            }
        }

        stage('Verify') {
            steps {
                script {
                    sh 'sleep 10'
                    sh 'curl -I http://localhost:8081 || true'  // Adjust if needed
                }
            }
        }
    }

    post {
        always {
            script {
                echo 'Cleaning up containers...'
                sh 'docker-compose down'
            }
        }
    }
}
