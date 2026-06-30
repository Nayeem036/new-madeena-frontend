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
                
                // 1. Install dependencies and safely extract rows into a beautiful HTML layout
                sh """
                    npm install mongodb --no-save || true
                    
                    node -e "
                    const { MongoClient } = require('mongodb');
                    const fs = require('fs');
                    async function run() {
                        const client = new MongoClient('mongodb://localhost:27017');
                        try {
                            await client.connect();
                            const bookings = await client.db('catering').collection('bookings').find({}).toArray();
                            
                            let html = '<html><head><meta charset=\"UTF-8\"><style>body{font-family:\"Segoe UI\",sans-serif;margin:40px;background-color:#f8f9fa}h2{color:#2C3E50;text-align:center}table{width:100%;border-collapse:collapse;background:#fff;box-shadow:0 4px 6px rgba(0,0,0,0.1);border-radius:8px;overflow:hidden}th{background-color:#2ECC71;color:white;padding:15px;text-align:left;font-size:14px;text-transform:uppercase}td{padding:12px 15px;border-bottom:1px solid #edf2f7;color:#4a5568;font-size:15px}tr:nth-child(even){background-color:#f9fbf9}tr:hover{background-color:#e8f8f0}.badge{background-color:#E2FBE8;color:#1E7E34;padding:4px 10px;border-radius:20px;font-weight:bold;font-size:12px;border:1px solid #c3e6cb}</style></head><body><h2>📋 Madeena Catering - Customer Bookings Ledger</h2><table><tr><th>Customer Name</th><th>Email Address</th><th>Phone Number</th><th>Event Date</th><th>Status</th></tr>';
                            
                            if(bookings.length === 0) {
                                html += '<tr><td colspan=\"5\" style=\"text-align:center;\">No live bookings found in the database.</td></tr>';
                            } else {
                                bookings.forEach(b => {
                                    html += '<tr><td><b>' + (b.name || b.customerName || 'N/A') + '</b></td><td>' + (b.email || 'N/A') + '</td><td>' + (b.phone || 'N/A') + '</td><td>' + (b.date || b.eventDate || 'N/A') + '</td><td><span class=\"badge\">Confirmed</span></td></tr>';
                                });
                            }
                            
                            html += '</table></body></html>';
                            fs.writeFileSync('booking_report.html', html);
                            console.log('✅ Visual report written successfully.');
                        } catch(e) {
                            console.error('❌ Script execution error:', e);
                        } finally {
                            await client.close();
                        }
                    }
                    run();
                    " || true
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
                        
                        # Upload logs
                        docker logs catering-container > frontend.log 2>&1 || true
                        docker logs catering-backend-container > backend.log 2>&1 || true
                        aws s3 cp frontend.log s3://${bucket}/build-${env.BUILD_NUMBER}/frontend.log || true
                        aws s3 cp backend.log s3://${bucket}/build-${env.BUILD_NUMBER}/backend.log || true
                        
                        # Upload our structured colorful file if it generated successfully
                        if [ -f "booking_report.html" ]; then
                            aws s3 cp booking_report.html s3://${bucket}/build-${env.BUILD_NUMBER}/booking_report.html --content-type "text/html" || true
                            echo "🚀 Report sent to S3!"
                        else
                            echo "⚠️ Report file was not generated."
                        fi
                    """
                }
            }
        }
    }
}