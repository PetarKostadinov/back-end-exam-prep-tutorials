const { application } = require('express');
const { register, login } = require('../services/userService');
const { parseError } = require('../util/parser');

const authController = require('express').Router();

authController.get('/register', (req, res) => {

    //TODO replace with actual view  from assignment
    res.render('register', {
        title: 'Register'
    });
});

authController.post('/register', async (req, res) => {
    try {
        if (req.body.username == '' || req.body.password == '') {
            throw new Error('All fields are required');
        }
        if (req.body.password != req.body.rePassword) {
            throw new Error('Passwods don\'t match');
        }
        const token = await register(req.body.username, req.body.password);

        //TODO check assigment to see if register creates session
        res.cookie('token', token);
        res.redirect('/');
    } catch (error) {
        const errors = parseError(error);

        //TODO add error display to actual template from assignment 
        res.render('register', {
            title: 'Register',
            errors,
            body: {
                username: req.body.username
            }
        })
    }
});

authController.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login'
    });
});

authController.post('/login', async (req, res) => {

    try {
       const token = await login(req.body.username, req.body.password);

        res.cookie('token', token);
        res.redirect('/');  // TODO replase with redirect as per assigment
    } catch (error) {
        const errors = parseError(error);
        res.render('login', {
            title: 'Login',
            errors,
            body: {
                username: req.body.username
            }

        });
    }
});

authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})


module.exports = authController; 