**Note :-**

1) **_For footer and header included in the ejs file_**

Now if we put  `<% include /partials/footer %>`
We will get an error saying that `no file found`,
this is because we used `'/'` before partials(`<% include /partials/footer %>`) , and
in it is considered as going back to the root
directory, so if the file is in the same directory
then we don't need to use the slash(`<% include partials/footer %>`)<= This is the code.
