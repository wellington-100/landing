




# Landing page / Product
    LOGIC:
        > product presentation
        > order product
        > payment
        > email notification / confirmation
        ? admin panel

    TECH STACK
    
        > nodejs (backend)
            - nodejs
            - http mini server
            - api endpoint
            - ? database
        > frontend
            - html
            - css (scss)
            - js (ajax/fetch)
            - bootstrap ..
        > vcs
            - git
            - github



node -> server.mjs
            |
            +-- server (class Server)
                  |
            +-----+---------------+         HTTP(S)
            |                     |
            |                     | <-------- req <--------- |      BROWSER
            |                     |                          |
            |                     | --------> res  --------> |
            |                     |
            |   .listen()         |
            +---------------------+         