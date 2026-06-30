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
                
                // 1. Provision spreadsheet generator tools and pull rows
                sh """
                    sudo apt-get update && sudo apt-get install -y python3-pip || true
                    pip3 install pymongo openpyxl --break-system-packages || true
                    
                    cd backend
                    python3 generate_excel_report.py || true
                    cd ..
                """
                
                // 2. Wrap AWS commands cleanly utilizing Jenkins environment injection binding
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding', 
                    credentialsId: 'aws-credentials-id', 
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID', 
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh """
                        export AWS_ACCESS_KEY_ID=\$AWS_ACCESS_KEY_ID
                        export AWS_SECRET_ACCESS_KEY=\$AWS_SECRET_ACCESS_KEY
                        export AWS_DEFAULT_REGION="us-east-1"
                        
                        if command -v aws >/dev/null 2>&1; then
                            if [ -f "booking_report.xlsx" ]; then
                                aws s3 cp booking_report.xlsx s3://${bucket}/build-${env.BUILD_NUMBER}/booking_report.xlsx || true
                                echo "🚀 Colorful Excel file uploaded successfully!"
                            else
                                echo "❌ Excel report file was not found."
                            fi
                        else
                            echo "⚠️ AWS CLI tool not present."
                        fi
                    """
                }
            }
        }
    }
}