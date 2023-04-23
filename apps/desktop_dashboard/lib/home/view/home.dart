import 'dart:math';

import 'package:bitsdojo_window/bitsdojo_window.dart';
import 'package:desktop_dashboard/home/widgets/title_bar.dart';
import 'package:flutter/material.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    double textScaleFactor(BuildContext context,
        {double maxTextScaleFactor = 2}) {
      final width = MediaQuery.of(context).size.width;
      double val = (width / 1400) * maxTextScaleFactor;
      return max(1, min(val, maxTextScaleFactor));
    }

    return Scaffold(
        body: WindowBorder(
      color: Colors.black,
      width: 1,
      child: Stack(
        children: [
          Row(
            children: [
              const Expanded(
                flex: 3,
                child: Image(
                  image: AssetImage(
                    "assets/images/login_background.jpg",
                  ),
                  height: double.infinity,
                  width: double.infinity,
                  fit: BoxFit.fill,
                ),
              ),
              Expanded(
                flex: 2,
                child: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Text(
                        "Welcome Back",
                        style: TextStyle(
                          fontSize: 30,
                          fontWeight: FontWeight.bold,
                          height: 0.8,
                        ),
                      ),
                      const Text(
                        "Please enter your details",
                        style: TextStyle(
                          fontSize: 16,
                        ),
                      ),
                      const SizedBox(
                        height: 20,
                      ),
                      SizedBox(
                        width: MediaQuery.of(context).size.width < 1000
                            ? 250
                            : 300,
                        child: TextFormField(
                          cursorColor: Colors.black,
                          cursorWidth: 1,
                          decoration: const InputDecoration(
                            hintText: "ApiKey",
                            focusedBorder: UnderlineInputBorder(
                              borderSide: BorderSide(
                                color: Colors.black,
                              ),
                            ),
                            contentPadding: EdgeInsets.symmetric(
                              vertical: 2,
                            ),
                          ),
                        ),
                      ),
                      SizedBox(
                        width: MediaQuery.of(context).size.width < 1000
                            ? 250
                            : 300,
                        child: TextFormField(
                          cursorColor: Colors.black,
                          cursorWidth: 1,
                          decoration: const InputDecoration(
                            // labelText: "Email",
                            hintText: "Host",
                            focusedBorder: UnderlineInputBorder(
                              borderSide: BorderSide(
                                color: Colors.black,
                              ),
                            ),
                            contentPadding: EdgeInsets.symmetric(
                              vertical: 2,
                            ),
                          ),
                        ),
                      ),
                      SizedBox(
                        width: MediaQuery.of(context).size.width < 1000
                            ? 250
                            : 300,
                        child: TextFormField(
                          cursorColor: Colors.black,
                          cursorWidth: 1,
                          decoration: const InputDecoration(
                            // labelText: "Email",
                            hintText: "Port",
                            focusedBorder: UnderlineInputBorder(
                              borderSide: BorderSide(
                                color: Colors.black,
                              ),
                            ),
                            contentPadding: EdgeInsets.symmetric(
                              vertical: 2,
                            ),
                          ),
                        ),
                      ),
                      SizedBox(
                        width: MediaQuery.of(context).size.width < 1000
                            ? 250
                            : 300,
                        child: TextFormField(
                          cursorColor: Colors.black,
                          cursorWidth: 1,
                          decoration: const InputDecoration(
                            // labelText: "Email",
                            hintText: "Path",
                            focusedBorder: UnderlineInputBorder(
                              borderSide: BorderSide(
                                color: Colors.black,
                              ),
                            ),
                            contentPadding: EdgeInsets.symmetric(
                              vertical: 2,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(
                        height: 20,
                      ),
                      SizedBox(
                        width: MediaQuery.of(context).size.width < 1000
                            ? 250
                            : 300,
                        height: 40,
                        child: TextButton(
                          onPressed: () {},
                          style: TextButton.styleFrom(
                            backgroundColor: Colors.black,
                          ),
                          child: const Text(
                            "Login",
                            style: TextStyle(
                              color: Colors.white,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
          Column(
            children: const [
              TitleBar(),
              // Expanded(
              //   child: Center(
              //     child: Text(
              //       "Home",
              //       style: TextStyle(
              //         color: Colors.red,
              //       ),
              //     ),
              //   ),
              // )
            ],
          ),
          Align(
            alignment: Alignment.centerLeft,
            child: Container(
              margin: const EdgeInsets.symmetric(horizontal: 30),
              child: Text(
                "\"We've been using Untitled to kick \n start every new prject and can't \n imagine working without it.\"",
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 22,
                  height: 1.5,
                ),
                textScaleFactor: textScaleFactor(context),
              ),
            ),
          ),
          Positioned(
            bottom: 10,
            child: Container(
              margin: const EdgeInsets.symmetric(horizontal: 30),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text(
                    "Otieno_otieno",
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                      height: 1.5,
                    ),
                  ),
                  Text(
                    "Dev",
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 13,
                      // height: 1.5,
                    ),
                    textAlign: TextAlign.left,
                  ),
                  Text(
                    "Ocluse",
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 13,
                      // height: 1.5,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    ));
  }
}
