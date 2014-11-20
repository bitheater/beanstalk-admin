Vagrant.configure("2") do |config|
    config.vm.provider :virtualbox do |v|
        v.name = "golang-beanstalk"
        v.customize ["modifyvm", :id, "--memory", 1024]
    end

    config.vm.box = "trusty64"
    config.vm.box_url = "https://vagrantcloud.com/ubuntu/trusty64/version/1/provider/virtualbox.box"

    config.vm.network :private_network, ip: "192.168.20.20"
    config.ssh.forward_agent = true

    config.vm.provision "ansible" do |ansible|
        ansible.raw_ssh_args = [ "-o UserKnownHostsFile=/dev/null" ]
        ansible.playbook = "ansible/playbook.yml"
    end

    config.vm.synced_folder "./", "/home/vagrant/gocode", type: "nfs", :mount_options => ['noatime']
end
