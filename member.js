function skillsMember() {
    var member = {
        name: "John Doe",
        age: 30,
        skills: ["Javascript", "React", "Node", "MongoDB"],
        details: function() {
            this.skills.forEach(function(skill) {
                console.log(`${this.name} knows ${skill}`);
            });
        }
    };
    member.details();
}