def gv

pipeline {
    agent any
    environment {
        //using this all the variable defined here. Will be available in whole script
        NEW_VERSION = '1.2.3.0'
    }
    stages {

        stage('InIt') {
            steps {
                script {
                    gv = load "groovyScript.groovy"
                }
            }
        }
        stage('Build') {
            when {
                expression {
                    CODE_CHANGE == true
                }
            }
            steps {
                    script {
                        gv.testFunction()
                    }
                echo 'Building..'
                echo "Building version ${NEW_VERSION}"
            }
        }
        stage('Test') {
            when {
                expression {
                    //this means this stage will only run when the branch
                    //is dev. Otherwise skip
                    env.BRANCH_NAME == "Dev"
                }
            }
            steps {
                script {
                        gv.anotherTestFunction()
                    }
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                echo "Version ${NEW_VERSION}"
            }
        }
    }
    // post {
    //      //execute some login after all stages executed
    //     always {
           
    //     }
    // }
}
