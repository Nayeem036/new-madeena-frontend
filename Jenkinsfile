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
                
                // 1. Generate the clean, stylized standalone HTML report directly
                sh """
                    cd backend
                    node -e "
                    const { MongoClient } = require('mongodb');
                    const fs = require('fs');
                    async function run() {
                        const client = new MongoClient('mongodb://localhost:27017');
                        try {
                            await client.connect();
                            const bookings = await client.db('catering').collection('bookings').find({}).toArray();
                            let html = '<html><head><style>body{font-family:Arial;margin:30px}table{width:100%;border-collapse:collapse}th{background-color:#2ECC71;color:white;padding:12px;text-align:left}td{padding:12px;border:1px solid #ddd}tr:nth-child(even){background-color:#f9f9f9}.badge{background-color:#E2FBE8;color:#1E7E34;padding:4px 8px;border-radius:4px;font-weight:bold}</style></head><body><h2>📋 Customer Bookings Ledger</h2><table><tr><th>Customer Name</th><th>Email</th><th>Phone</th><th>Event Date</th><th>Status</th></tr>';
                            bookings.forEach(b => {
                                html += '<tr><td><b>' + (b.name || b.customerName || 'N/A') + '</b></td><td>' + (b.email || 'N/A') + '</td><td>' + (b.phone || 'N/A') + '</td><td>' + (b.date || b.eventDate || 'N/A') + '</td><td><span class=\"badge\">Confirmed</span></td></tr>';
                            });
                            html += '</table></body></html>';
                            fs.writeFileSync('../booking_report.html', html);
                        } catch(e) {} finally { await client.close(); }
                    }
                    run();
                    " || true
                    cd ..
                """
                
                // 2. Upload cleanly to S3 using verified credentials
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding', 
                    credentialsId: 'aws-credentials-id', 
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID', 
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh """
                        export AWS_DEFAULT_REGION="us-east-1"
                        if [ -f "booking_report.html" ]; then
                            aws s3 cp booking_report.html s3://${bucket}/build-${env.BUILD_NUMBER}/booking_report.html --content-type "text/html" || true
                        fi
                        docker logs catering-container > frontend.log 2>&1 || true
                        docker logs catering-backend-container > backend.log 2>&1 || true
                        aws s3 cp frontend.log s3://${bucket}/build-${env.BUILD_NUMBER}/frontend.log || true
                        aws s3 cp backend.log s3://${bucket}/build-${env.BUILD_NUMBER}/backend.log || true
                    """
                }
            }
        }
    }
}