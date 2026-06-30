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
                
                // 1. Run the generation script inside the running backend container, then extract the file
                sh """
                    docker exec catering-backend-container node generate-report.js || true
                    docker cp catering-backend-container:/app/booking_report.html ./booking_report.html || true
                """
                
                // 2. Upload system logs and the generated visual dashboard report to S3
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding', 
                    credentialsId: 'aws-credentials-id', 
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID', 
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh """
                        export AWS_DEFAULT_REGION="us-east-1"
                        
                        # Save running container console logs
                        docker logs catering-container > frontend.log 2>&1 || true
                        docker logs catering-backend-container > backend.log 2>&1 || true
                        
                        # Upload log assets
                        aws s3 cp frontend.log s3://${bucket}/build-${env.BUILD_NUMBER}/frontend.log || true
                        aws s3 cp backend.log s3://${bucket}/build-${env.BUILD_NUMBER}/backend.log || true
                        
                        # Upload the visual HTML grid report
                        if [ -f "booking_report.html" ]; then
                            aws s3 cp booking_report.html s3://${bucket}/build-${env.BUILD_NUMBER}/booking_report.html --content-type "text/html" || true
                            echo "🚀 Colored table report successfully uploaded to S3!"
                        else
                            echo "⚠️ Report dashboard file was missing or generation skipped."
                        fi
                    """
                }
            }
        }
    }
}