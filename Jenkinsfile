pipeline {
    agent any
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Nayeem036/new-madeena-frontend.git'
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'sonar' 
                    withSonarQubeEnv('sonar') {
                        sh "${scannerHome}/bin/sonar-scanner \
                        -Dsonar.projectKey=new-madeena-frontend \
                        -Dsonar.sources=."
                    }
                }
            }
        }

        stage('Build & Deploy Frontend') {
            steps {
                script {
                    sh 'docker build --no-cache -t catering-frontend:latest .'
                    sh 'docker stop catering-container || true'
                    sh 'docker rm catering-container || true'
                    sh 'docker run -d -p 3000:80 --name catering-container catering-frontend:latest'
                }
            }
        }

        stage('Build & Deploy Backend') {
            steps {
                script {
                    dir('backend') {
                        sh 'docker build -t catering-backend:latest .'
                        sh 'docker stop catering-backend-container || true'
                        sh 'docker rm catering-backend-container || true'
                        // Added --network="host" so it can find the MongoDB container on localhost
                        sh 'docker run -d --network="host" --name catering-backend-container catering-backend:latest'
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                def bucket = "nayeem-madeena-logs"
                
                sh """
                    # Capture logs safely (using || true so a missing container won't crash the build)
                    docker logs catering-container > frontend.log 2>&1 || true
                    docker logs catering-backend-container > backend.log 2>&1 || true
                    docker logs catering-db > mongodb.log 2>&1 || true
                    
                    # Upload to S3 safely (using || true so AWS CLI issues won't crash the build)
                    if command -v aws >/dev/null 2>&1; then
                        aws s3 cp frontend.log s3://${bucket}/build-${env.BUILD_NUMBER}/frontend.log || true
                        aws s3 cp backend.log s3://${bucket}/build-${env.BUILD_NUMBER}/backend.log || true
                        aws s3 cp mongodb.log s3://${bucket}/build-${env.BUILD_NUMBER}/mongodb.log || true
                    else
                        echo "AWS CLI not found on Jenkins agent. Skipping S3 upload."
                    fi
                """
            }
        }
    }
}